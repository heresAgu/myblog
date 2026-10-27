type EntranceWindow = Window & { __aguHomeIntroTimer?: number }

export async function initHomeEntrance() {
  const overlay = document.querySelector<HTMLElement>('#home-entrance')
  const html = document.documentElement
  if (!overlay || overlay.hidden || !html.classList.contains('agu-home-entrance')) return

  const portrait = overlay.querySelector<HTMLElement>('.home-entrance__portrait')
  const image = overlay.querySelector<HTMLElement>('.home-entrance__image')
  const name = overlay.querySelector<HTMLElement>('.home-entrance__name')
  const veil = overlay.querySelector<HTMLElement>('.home-entrance__veil')
  const ring = overlay.querySelector<SVGElement>('circle')
  const skip = overlay.querySelector<HTMLButtonElement>('button')
  const avatar = document.querySelector<HTMLImageElement>('.home-hero__avatar')
  const title = document.querySelector<HTMLElement>('[data-home-entrance-title]')
  const main = document.querySelector<HTMLElement>('.editorial-home')
  const header = document.querySelector<HTMLElement>('.site-header')
  const footer = document.querySelector<HTMLElement>('.site-shell > footer')
  const entranceWindow = window as EntranceWindow
  const controller = new AbortController()
  const animations: Animation[] = []
  const background = [main, header, footer].filter((node): node is HTMLElement => Boolean(node))
  let finished = false
  let started = false

  const finish = (restoreFocus = true) => {
    if (finished) return
    finished = true
    window.clearTimeout(entranceWindow.__aguHomeIntroTimer)
    html.classList.remove('agu-home-entrance')
    background.forEach((element) => {
      if (element.hasAttribute('data-agu-intro-inert')) {
        element.inert = false
        element.removeAttribute('data-agu-intro-inert')
      }
    })
    overlay.hidden = true
    overlay.dataset.state = 'done'
    animations.forEach((animation) => animation.cancel())
    controller.abort()
    if (started) {
      try {
        sessionStorage.setItem('agu:home-entrance:v1', 'seen')
      } catch {
        // Storage is optional; the page is always released.
      }
    }
    if (restoreFocus && document.activeElement === skip && main) {
      main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    }
  }
  const options = { signal: controller.signal }
  window.addEventListener('agu:home-intro-cancel', () => finish(), options)
  window.addEventListener('pagehide', () => finish(false), options)
  window.addEventListener('resize', () => finish(), options)
  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') finish()
    },
    options
  )
  skip?.addEventListener('click', () => finish(), options)
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  motion.addEventListener(
    'change',
    () => {
      if (motion.matches) finish()
    },
    options
  )

  if (
    !portrait ||
    !image ||
    !name ||
    !veil ||
    !ring ||
    !avatar ||
    !title ||
    !skip ||
    !main ||
    window.scrollY > 0
  ) {
    finish(false)
    return
  }

  background.forEach((element) => {
    if (!element.inert) {
      element.inert = true
      element.setAttribute('data-agu-intro-inert', '')
    }
  })
  started = true
  skip.focus({ preventScroll: true })

  try {
    await Promise.race([
      Promise.all([avatar.decode().catch(() => {}), document.fonts.load('400 96px Newsreader')]),
      new Promise((resolve) => window.setTimeout(resolve, 400))
    ])
    if (finished) return

    const avatarRect = avatar.getBoundingClientRect()
    const titleRect = title.getBoundingClientRect()
    if (!avatarRect.width || !titleRect.width) {
      finish(false)
      return
    }

    const compact = innerWidth <= 600
    const avatarSize = compact ? 76 : 96
    const nameStyle = getComputedStyle(title)
    const nameScale = Math.min(1, (compact ? 38 : 48) / parseFloat(nameStyle.fontSize))
    const portraitStartX = innerWidth / 2 - avatarSize / 2
    const portraitStartY = innerHeight / 2 - (compact ? 90 : 106)
    const nameStartX = innerWidth / 2 - (titleRect.width * nameScale) / 2
    const nameStartY = portraitStartY + avatarSize + 28

    Object.assign(portrait.style, {
      left: `${avatarRect.left}px`,
      top: `${avatarRect.top}px`,
      width: `${avatarRect.width}px`,
      height: `${avatarRect.height}px`
    })
    const avatarStyle = getComputedStyle(avatar)
    portrait.style.setProperty(
      '--entrance-outline',
      `${parseFloat(avatarStyle.outlineOffset) + parseFloat(avatarStyle.outlineWidth) / 2}px`
    )
    Object.assign(name.style, {
      left: `${titleRect.left}px`,
      top: `${titleRect.top}px`,
      width: `${titleRect.width}px`,
      height: `${titleRect.height}px`,
      fontFamily: nameStyle.fontFamily,
      fontSize: nameStyle.fontSize,
      lineHeight: nameStyle.lineHeight,
      letterSpacing: nameStyle.letterSpacing
    })
    // Inline text and a fixed block have different baselines, even with the same font.
    const textBox = (element: HTMLElement) => {
      const range = document.createRange()
      range.selectNodeContents(element)
      return range.getBoundingClientRect()
    }
    const targetText = textBox(title)
    const proxyText = textBox(name)
    const nameEndX = titleRect.left + targetText.left - proxyText.left
    const nameEndY = titleRect.top + targetText.top - proxyText.top
    name.style.left = `${nameEndX}px`
    name.style.top = `${nameEndY}px`
    overlay.dataset.state = 'playing'

    const animate = (element: Element, frames: Keyframe[], timing: KeyframeAnimationOptions) => {
      const animation = element.animate(frames, { fill: 'both', ...timing })
      animations.push(animation)
      return animation
    }
    const portraitStart = `translate(${portraitStartX - avatarRect.left}px, ${portraitStartY - avatarRect.top}px) scale(${avatarSize / avatarRect.width})`
    const nameStart = `translate(${nameStartX - nameEndX}px, ${nameStartY - nameEndY}px) scale(${nameScale})`
    const flight = {
      duration: compact ? 700 : 820,
      delay: 430,
      easing: 'cubic-bezier(0.22, 0.75, 0.2, 1)'
    }
    animate(portrait, [{ transform: portraitStart }, { transform: 'none' }], flight)
    animate(name, [{ transform: nameStart }, { transform: 'none' }], flight)
    animate(portrait, [{ opacity: 0 }, { opacity: 1 }], { duration: 260 })
    animate(
      image,
      [{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(71% at 50% 50%)' }],
      { duration: 400, easing: 'ease-out' }
    )
    animate(ring, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
      duration: 520,
      delay: 30,
      easing: 'ease-out'
    })
    animate(name, [{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 160 })
    animate(veil, [{ opacity: 1 }, { opacity: 0 }], { duration: 520, delay: 520 })
    background.forEach((element, index) => {
      animate(element, [{ opacity: 0 }, { opacity: 1 }], { duration: 360, delay: 780 + index * 45 })
    })
    await Promise.all(animations.map((animation) => animation.finished))
    finish()
  } catch {
    finish()
  }
}
