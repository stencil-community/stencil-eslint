@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() title?: string;

  @Method()
  async innerHTML() {
    return 'ouch';
  }

  render() {
    return (<div>test</div>);
  }
}
