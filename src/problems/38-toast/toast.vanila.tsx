import { AbstractComponent, type TComponentConfig } from '@course/utils'

export class Toast extends AbstractComponent<any> {
  constructor(config: TComponentConfig<any>) {
    super(config)
  }
  toHTML() {
    return '<div>TODO: Implement Toast</div>'
  }
  toast(item: any) {}
}
