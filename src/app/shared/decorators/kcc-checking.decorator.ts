export function KccChecking( target: any ) {

    Object.defineProperty(target.prototype, 'kccCheck', {
        value: true,
        writable: false
    });
    
}
