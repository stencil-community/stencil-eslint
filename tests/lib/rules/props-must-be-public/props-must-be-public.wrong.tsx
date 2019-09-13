@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() private testPrivate?: string;
  @Prop() protected testProtected?: string;

  render() {
    return (<div>test</div>);
  }
}
