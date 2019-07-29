import { ObserverLocator } from 'aurelia-binding';
import { Container, BindingEngine } from 'aurelia-framework';
import { isUndefined } from 'logofx';
import { isNullOrUndefined } from 'util';


export function getDefaultBindingEngine(): BindingEngine {
    return <BindingEngine>Container.instance.get(BindingEngine);
}

export function getDefaultObserverLocator(): ObserverLocator {
    return <ObserverLocator>Container.instance.get(ObserverLocator);
}

declare global {
  interface StringConstructor {
    empty: string;
    isEmptyOrWhitespace(s: string): boolean;
    
}}

String.empty = ''.toString();

String.isEmptyOrWhitespace = function(s: string): boolean {
  return (s !== undefined && s !== null) && s.trim().length === 0;
}

