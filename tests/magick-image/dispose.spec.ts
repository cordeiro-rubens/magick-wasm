// Copyright Dirk Lemstra https://github.com/dlemstra/Magick.WASM.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { MagickImage } from '../../src/magick-image';

beforeEach(() => { ImageMagick._api = (global as any).native; });

describe('MagickImage#dispose', () => {
    it('should dispose the image', () => {
        const image = MagickImage.create();
        image.dispose();
        expect(() => {
            image.resize(1, 1);
        }).toThrowError('instance is disposed');
    });
});