import {Functor} from "./prelude";



export class Right<A> implements Functor<A> {
    constructor(public val: A) {}

    static of <A>(val:A){
        return new Right(val);
    }

    map<B>(fn: (A)=>B): Functor<B> {
        return Right.of(fn(this.val));
    }
}

export class Left<A> implements Functor<A> {
    constructor(public val: A) {}

    static of <A>(val: A) {
        return new Left(val);
    }

    map<B>(fn: (A)=>B): Functor<B> {
        return this;
    }
}