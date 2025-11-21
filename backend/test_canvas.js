try {
    console.log('Loading canvas...');
    require('canvas');
    console.log('Canvas loaded successfully');
} catch (e) {
    console.error('Canvas failed to load:', e);
}
