@Component({ tag: 'sample-tag' })
export class SampleTag {

  @Method() test?: string;

  @Watch() element!: HTMLElement;

  @Prop()
  async someMethod() {
    return 'method';
  }

  @Element()
  watchForTest() {
    console.log('watch', this.test);
  }

  render() {
    return (<div>test</div>);
  }
}
