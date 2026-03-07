// bun test src/problems/41-calculator/test/calculator.utils.test.ts

import { AbstractComponent, type TComponentConfig } from '../18-abstract-component/component'

export class Calculator extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement Calculator</div>'
  }
}
