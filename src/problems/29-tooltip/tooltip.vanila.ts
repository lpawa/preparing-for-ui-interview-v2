import { AbstractComponent, type TComponentConfig } from '@course/utils'
import css from './tooltip.module.css'

type TTooltipProps = {
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  children: HTMLElement
  content: string
  boundary?: HTMLElement
}

const positions = {
  top: css.top,
  bottom: css.bottom,
  left: css.left,
  right: css.right,
} as const

const OFFSET = 8 // 0.5rem

let id = 0

type TCandidate = { position: 'top' | 'bottom' | 'left' | 'right'; x: number; y: number }

/**
 * Helper: determine best position when position='auto'
 * - Get bounding rects for tooltip and container
 * - Check candidates (top, right, bottom, left) against boundary
 * - Return first position that fits, or 'top' as fallback
 */
function getAutoPosition(
  tooltip: HTMLElement,
  container: HTMLElement,
  boundaryRect: { left: number; top: number; right: number; bottom: number },
) {
  // TODO: implement
  return 'top' as const
}

/**
 * Expected input:
 * {
 *   "children": HTMLElement (the trigger element),
 *   "content": "Tooltip text",
 *   "position": "top" | "bottom" | "left" | "right" | "auto",
 *   "boundary": HTMLElement (optional, for auto-positioning)
 * }
 *
 * Step 1: Extend AbstractComponent<TTooltipProps>
 * - Call super() with config, adding:
 *   - className: [css.container]
 *   - listeners: ['mouseenter', 'mouseleave', 'focusin', 'focusout', 'keydown']
 * - Store a unique id and a reference for the tooltip element
 */
export class Tooltip extends AbstractComponent<TTooltipProps> {
  id = id++
  tooltipElement: HTMLElement | null = null

  constructor(config: TComponentConfig<TTooltipProps>) {
    super({
      ...config,
      className: [css.container],
      listeners: ['mouseenter', 'mouseleave', 'focusin', 'focusout', 'keydown'],
    })
  }

  /**
   * Step 2: Implement toHTML
   * - Return a <div> with role="tooltip", unique id, display:none
   * - Apply css.tooltip class and position class from positions map
   * - Content comes from this.config.content
   */
  toHTML(): string {
    // TODO: implement
    return ''
  }

  /**
   * Step 3: Implement afterRender
   * - Append this.config.children (the trigger element) to this.container
   * - Query and store the tooltip element by its id
   */
  afterRender(): void {
    // TODO: implement
  }

  /**
   * Step 4: Implement event handlers
   * - onMouseenter / onFocusin: show the tooltip (call showTooltip)
   * - onMouseleave / onFocusout: hide the tooltip (set display to 'none')
   * - onKeydown: hide on Escape key
   */
  onMouseenter() {
    // TODO: implement
  }

  onMouseleave() {
    // TODO: implement
  }

  onFocusin() {
    // TODO: implement
  }

  onFocusout() {
    // TODO: implement
  }

  onKeydown(e: KeyboardEvent) {
    // TODO: implement
  }

  /**
   * Step 5: Implement showTooltip
   * - Set tooltip display to 'block'
   * - If position is 'auto': compute best position using getAutoPosition,
   *   remove all position classes, add the computed one
   */
  showTooltip() {
    // TODO: implement
  }
}
