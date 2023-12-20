@Component({ tag: 'sample-tag' })
export class SampleTag {
  // this component tests members from HTMLElement (including inherited)

  // Global attribute
  @Prop() autocapitalize?: string;

  // Node prop
  @Prop() isConnected?: string;

  // Element prop
  @Prop() id?: string;

  // HTMLElement prop
  @Prop() title?: string;

  // HTMLElement method (as prop)
  @Prop() blur?: string;

  // EventTarget method
  @Method()
  async dispatchEvent() {
    return 'ouch';
  }

  // Node method
  @Method()
  async contains() {
    return 'ouch';
  }

  // Element method
  @Method()
  async closest() {
    return 'ouch';
  }

  // HTMLElement method
  @Method()
  async focus() {
    return 'ouch';
  }

  // Element prop (as component method)
  @Method()
  async innerHTML() {
    return 'ouch';
  }

  render() {
    return (<div>test</div>);
  }
}
