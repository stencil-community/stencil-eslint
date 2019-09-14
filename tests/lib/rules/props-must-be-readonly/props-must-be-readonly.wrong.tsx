@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() test?: string;

  render() {
    return (<div>test</div>);
  }
}
