// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ImageMagick } from '../../src/image-magick';
import { JSDOM } from 'jsdom';
import { MagickColors } from '../../src/magick-colors';
import { colorAssert } from '../color-assert';

beforeEach(() => {
    ImageMagick._api = (global as any).native;
});

describe('ImageMagick#readFromCanvas', () => {
    it('should read the image data from the canvas', () => {
        const window = new JSDOM().window;

        const canvas = window.document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 2;

        window.HTMLCanvasElement.prototype.getContext = <any> jest.fn(function(contextId: string) {
            expect(contextId).toBe('2d');
            return {
                getImageData: function(x: number, y: number, width: number, height: number) {
                    expect(x).toBe(0);
                    expect(y).toBe(0);
                    expect(width).toBe(canvas.width);
                    expect(height).toBe(canvas.height);
                    return {
                        data: new Uint8ClampedArray([
                            255, 0, 255, 255,
                            255, 0, 0, 255
                        ])
                    }
                }
            };
        });

        ImageMagick.readFromCanvas(canvas, image => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);

            colorAssert(image, 0, 0, MagickColors.Magenta);
            colorAssert(image, 0, 1, MagickColors.Red);
        });
    });

    it('should read the image data from the canvas async', async () => {
        const window = new JSDOM().window;

        const canvas = window.document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 2;

        window.HTMLCanvasElement.prototype.getContext = <any> jest.fn(function(contextId: string) {
            expect(contextId).toBe('2d');
            return {
                getImageData: function(x: number, y: number, width: number, height: number) {
                    expect(x).toBe(0);
                    expect(y).toBe(0);
                    expect(width).toBe(canvas.width);
                    expect(height).toBe(canvas.height);
                    return {
                        data: new Uint8ClampedArray([
                            255, 0, 255, 255,
                            255, 0, 0, 255
                        ])
                    }
                }
            };
        });

        await ImageMagick.readFromCanvas(canvas, image => {
            expect(image.width).toBe(1);
            expect(image.height).toBe(2);

            colorAssert(image, 0, 0, MagickColors.Magenta);
            colorAssert(image, 0, 1, MagickColors.Red);
        });
    });
});
