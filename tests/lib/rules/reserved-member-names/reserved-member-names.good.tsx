@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() sampleProp?: string;

  @Method() async sampleMethod(): Promise<void> {}

  render() {
    return (<div>test</div>);
  }
}
