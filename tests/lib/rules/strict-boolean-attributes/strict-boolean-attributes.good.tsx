@Component({ tag: 'sample-tag' })
export class SampleTag {
    @Prop({ reflect: true }) aBoolean = false;

    render() {
        return (<div>test</div>);
    }
}
