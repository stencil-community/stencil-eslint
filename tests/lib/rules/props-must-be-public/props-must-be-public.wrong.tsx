@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() private test?: string;

  render() {
    return (<div>test</div>);
  }
}
