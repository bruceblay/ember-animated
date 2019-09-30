import { Motion, rAF } from 'ember-animated';
import { BoxShadow, BoxShadowTween } from '../box-shadow';

export default function boxShadow(sprite, opts) {
  return new BoxShadowMotion(sprite, opts).run();
}

export class BoxShadowMotion extends Motion {
  *animate() {
    let from = BoxShadow.fromComputedStyle(this.sprite.initialComputedStyle['box-shadow']);
    let to = BoxShadow.fromComputedStyle(this.sprite.finalComputedStyle['box-shadow']);
    let shadowTween = new BoxShadowTween(from, to, this.duration, this.opts.easing);
    while (!shadowTween.done) {
      this.sprite.applyStyles({
        'box-shadow': shadowTween.currentValue.map(shadow => shadow.toString()).join(',')
      });
      yield rAF();
    }
  }
}

