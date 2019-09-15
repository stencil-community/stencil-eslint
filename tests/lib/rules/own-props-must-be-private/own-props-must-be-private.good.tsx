@Component({ tag: 'sample-tag' })
export class SampleTag {
  private internalProp: string;
  @OwnDecorator() private internalDecoratedProp: string;

  @Prop() readonly test?: string;
  @Prop({ mutable: true }) testMutable?: string;

  render() {
    return (<div>test</div>);
  }
}
