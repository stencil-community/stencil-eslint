@Component({ tag: 'sample-tag' })
export class SampleTag {
    @Prop({ reflect: true }) aBoolean = true;

    render() {
        return (<div>test</div>);
    }
}
