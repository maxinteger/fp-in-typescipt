import {Maybe, Just, Nothing} from "./Maybe";
/**
 * Created by lvadasz on 04/08/2016.
 */

interface CurriedFunction2<T1, T2, R> {
    (t1: T1): (t2: T2) => R;
    (t1: T1, t2: T2): R;
}

interface CurriedFunction3<T1, T2, T3, R> {
    (t1: T1): CurriedFunction2<T2, T3, R>;
    (t1: T1, t2: T2): (t3: T3) => R;
    (t1: T1, t2: T2, t3: T3): R;
}

export function curry2<T1, T2, R>(f: (t1: T1, t2: T2) => R): CurriedFunction2<T1, T2, R> {
    function curriedFunction(t1: T1): (t2: T2) => R;
    function curriedFunction(t1: T1, t2: T2): R;
    function curriedFunction(t1: T1, t2?: T2): any {
        switch (arguments.length) {
            case 1:
                return function (t2: T2): R {
                    return f(t1, t2);
                };
            case 2:
                return f(t1, t2);
        }
    }

    return curriedFunction;
}

export function curry3<T1, T2, T3, R>(f: (t1: T1, t2: T2, t3: T3) => R): CurriedFunction3<T1, T2, T3, R> {
    function curriedFunction(t1: T1): CurriedFunction2<T2, T3, R>;
    function curriedFunction(t1: T1, t2: T2): (t3: T3) => R;
    function curriedFunction(t1: T1, t2: T2, t3: T3): R;
    function curriedFunction(t1: T1, t2?: T2, t3?: T3): any {
        switch (arguments.length) {
            case 1:
                return curry2(function (t2: T2, t3: T3): R {
                    return f(t1, t2, t3);
                });
            case 2:
                return function (t3: T3): R {
                    return f(t1, t2, t3);
                };
            case 3:
                return f(t1, t2, t3);
        }
    }

    return curriedFunction;
}

export const and = curry2( function(a:boolean, b:boolean): boolean{
    return a && b;
});

export const or = curry2( function(a:boolean, b:boolean): boolean{
    return a || b;
});

// maybe :: b -> (a -> b) Maybe a -> a
export const maybe = curry3(function <A, B>(defVal: B, f: (a:A) => B, m: Just<A>|Nothing):B {
     return m instanceof Nothing ? defVal : f((m as Just<A>).val);
});

// id :: a -> a
export function id <A>(v:A): A {
    return v;
}

// constant :: a -> (_ -> a)
export function constant <A>(v:A): () => A {
    return () => v;
}


// compose :: (a -> b) -> (b -> c) -> a -> c
export function compose <A,B,C>(f: (A)=>B, g: (B)=>C): (A)=>C {
    return x => g(f(x));
}

// compose2 :: (a -> b) -> (b -> c) -> (c -> d) -> a -> d
export function compose3 <A,B,C,D>(f: (A)=>B, g: (B)=>C, h: (C)=>D): (A)=>D {
    return x => h(g(f(x)));
}

// compose3 :: (a -> b) -> (b -> c) -> (c -> d) -> (d -> e) -> a -> e
export function compose4 <A,B,C,D,E>(f: (A)=>B, g: (B)=>C, h: (C)=>D, i: (D)=>E): (A)=>E {
    return (x)=>i(h(g(f(x))));
}

// compose4 :: (a -> b) -> (b -> c) -> (c -> d) -> (d -> e) -> (e -> f) -> a -> f
export function compose5 <A,B,C,D,E,F>(f: (A)=>B, g: (B)=>C, h: (C)=>D, i: (D)=>E, j: (E)=>F): (A)=>F {
    return (x) => j(i(h(g(f(x)))));
}

// flip :: (a -> b -> c) -> a -> b -> c
export const flip = function <A, B, C>(f: (A, B) => C): CurriedFunction2<B, A, C> {
    return curry2((b, a) => f(a, b));
};

// application op ($) :: (a -> b) -> a -> b
export const apl = curry2(function <A, B>(f: (A)=>B, a:A):B {
    return f(a);
});

export const until = curry3(function <A>(p:(A)=>boolean, f: (A)=>A, a:A):A {
    let _a = a;
    while(p(_a)) _a = f(_a);
    return _a;
});

/*
    LIST operations
*/

export interface Functor<T>{
    map <B>(fn: (A) => B ): Functor<B>
}

// map :: Functor f => (a -> b) -> f a -> f b
export const map = curry2(function <A,B>(fn: (a: A) => B, f: Functor<A>): Functor<B> {
    return f.map(fn);
});

// append
export const append = curry2(function <A>(x: Array<A>, y: Array<A>):Array<A> {
    return [...x, ...y];
});

export const filter = curry2(function <A>(p: (A)=>boolean, ary:Array<A>):Array<A> {
    return ary.filter(p);
});

// head [a] -> a
export const head = function <A>(a:Array<A>): A {
    return a[0];
};

// last [a] -> a
export const last = function <A>(ary: Array<A>): A {
    return ary[ary.length - 1];
};

// tail [a] -> [a]
export const tail = function <A>(ary:Array<A>): Array<A> {
    return ary.slice(1);
};

// init [a] -> [a]
export const init = function <A>(ary:Array<A>):Array<A> {
    return ary.slice(0, ary.length - 1);
};

// null Foldable t => t a => Bool
export const nul = function (ary: Array<any>):boolean {
    return !!ary.length;
};

export const length = function (ary: Array<any>):number {
    return ary.length;
};

export const idx = curry2(function <A>(ary:Array<A>, i:number):A {
    return ary[i];
});

export const reverse = function <A>(ary: Array<A>):Array<A> {
    return ary.slice(0).reverse();
};