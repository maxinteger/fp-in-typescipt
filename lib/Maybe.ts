import {Functor} from "./prelude";

export class Maybe{
    static of<A>(val:A): Just<A>|Nothing{
        return val ? new Just<A>(val) : new Nothing();
    }
}

export class Just<A> implements Functor<A>{
    constructor(public val:A){}

    map<B>(fn: (A)=>B): Functor<B> {
        return Maybe.of(fn(this.val));
    }
}

export class Nothing implements Functor<any>{
    map<B>(fn: (A)=>B): Functor<B> {
        return this;
    }
}