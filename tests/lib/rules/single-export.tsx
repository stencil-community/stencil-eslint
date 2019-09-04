import { Component, h } from '@stencil/core';

@Component({ tag: 'sample-tag' })
export class SampleTag {
  render() {
    return (<div>test</div>);
  }
}

@Component({ tag: 'sample-tag' })
export class Sample2Tag {
  render() {
    return (<div>test</div>);
  }
}
