export function KccChecking( target: any ) {
    // Do the business to get the cookie and check whatever we need to do.. then

    Object.defineProperty(target.prototype, 'kccCheck', {
        value: true,
        writable: false
    });
    
}