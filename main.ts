import {map, compose, id, constant, compose3, curry2, head} from "./lib/prelude";
import {Maybe} from "./lib/Maybe";

const add = curry2((a: number, b:number) => a + b);

console.log(
    map(
        compose3(
            map(add(2)),
            head,
            add(3)
        )
    )(Maybe.of([1,2,3]))
);