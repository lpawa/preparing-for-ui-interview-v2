import { AbstractComponent, type TComponentConfig } from '@course/utils'

export class PortfolioVisualizer extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement PortfolioVisualizer</div>'
  }
}
