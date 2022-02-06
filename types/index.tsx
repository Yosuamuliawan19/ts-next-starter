export interface BaseElement {
  type: 'img' | 'svg' | 'button' | 'text' | 'youtube';
  pos: Pos;
  rotate: number;
  size: Size;
  class: string;
  value: string;
  link: string;
  key?: string;
}

export interface Pos {
  x: number;
  y: number;
  z: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ContentElement {
  backgroundColor: string;
  color: string;
}

export interface ITextElement extends BaseElement, ContentElement {
  fontSize: number;
  fontFamily: string;
  textAlign: string;
}

export interface IButtonElement extends BaseElement, ContentElement {
  fontSize: number;
  fontFamily: string;
  textAlign: string;
  logo: string;
}
export type IImageElement = BaseElement;

export type IYoutubeElement = BaseElement;

export interface ISVGElement extends BaseElement, ContentElement {}

export type IElement =
  | ITextElement
  | IButtonElement
  | IImageElement
  | ISVGElement
  | IYoutubeElement;
