@Component({ tag: 'sample-tag' })
export class SampleTag {
  @Prop() readonly test?: string;
  @Prop({ mutable: true }) testMutable?: string;
  @Prop({ mutable: true }) testMutable2?: boolean;
  @Prop({ mutable: false }) readonly testNotMutable?: boolean;
  @Prop({ mutable: true }) mutableInJsx?: boolean;
  @Prop({ mutable: true }) mutableInJsx2?: boolean;
  @Prop({ mutable: true }) testMutableReturn?: boolean;

  private internalMethod() {
    const test = 'hi';
    if (!this.testNotMutable) {
      this.testMutable = 'other value';
    }
    return this.testMutableReturn = true;
  }

  private onClick(e: Event) {
    e.preventDefault();
    if (!this.testNotMutable) {
      this.testMutable = true;
    } else if (this.testMutable === undefined) {
      this.testMutable2 = !this.testMutable2;
    }
  }

  render() {
    return (
      <div class="odp-button-selector" onClick={(e) => this.mutableInJsx = true}>
        {this.values.map((value, index) => {
          return (
            <div
              onClick={() => (this.mutableInJsx2 = index)}
              class={{
                'odp-button-selector-label': true,
                selected: index === this.selected
              }}>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    );
  }
}
