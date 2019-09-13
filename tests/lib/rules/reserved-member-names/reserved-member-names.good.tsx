@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() sampleProp?: string;

  render() {
    return (<div>test</div>);
  }
}
