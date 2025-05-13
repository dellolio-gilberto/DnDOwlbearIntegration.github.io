// Make functions globally available by attaching them to window
(function(window) {
    // Global variables for dddice
    let dddiceCanvas = null;
    let dddiceInstance = null;

    // Setup canvas function
    function setupCanvas() {
        dddiceCanvas = document.getElementById('dddice');
        if (!dddiceCanvas) {
            dddiceCanvas = document.createElement('canvas');
            dddiceCanvas.id = 'dddice';
            dddiceCanvas.style.position = 'absolute';
            dddiceCanvas.style.top = '0';
            dddiceCanvas.style.left = '0';
            dddiceCanvas.style.width = '100%';
            dddiceCanvas.style.height = '100%';
            dddiceCanvas.style.pointerEvents = 'none';
            dddiceCanvas.style.zIndex = '1000';
            document.body.appendChild(dddiceCanvas);
        }
        // Set canvas size
        dddiceCanvas.width = window.innerWidth;
        dddiceCanvas.height = window.innerHeight;
    }

    // Expose functions to global scope
    window.initDice = async function() {
        try {
            setupCanvas();
            const input = prompt('Enter API Key');
            if (input) {
                // Create new ThreeDDice instance
                dddiceInstance = new window.ThreeDDice(dddiceCanvas, input);
                // Start the engine
                await dddiceInstance.start();
                alert('dddice initialized successfully!');
            }
        } catch (error) {
            console.error('Error initializing dddice:', error);
            alert('Error initializing dddice: ' + error.message);
        }
    };

    window.joinDiceRoom = async function() {
        if (!dddiceInstance) {
            alert('dddice is not initialized');
            return;
        }

        try {
            const input = prompt('Enter Room Slug');
            if (input) {
                await dddiceInstance.connect(input);
                alert('Successfully joined room: ' + input);
            }
        } catch (error) {
            console.error('Error joining room:', error);
            alert('Error joining room: ' + error.message);
        }
    };

    window.rollD20 = async function() {
        if (!dddiceInstance) {
            alert('dddice is not initialized');
            return;
        }

        try {
            await dddiceInstance.roll([
                { type: 'd20', theme: 'dddice-bees' }
            ]);
        } catch (error) {
            console.error('Error rolling dice:', error);
            alert('Error rolling dice: ' + error.message);
        }
    };

    // Handle window resize
    window.addEventListener('resize', function() {
        if (dddiceCanvas) {
            dddiceCanvas.width = window.innerWidth;
            dddiceCanvas.height = window.innerHeight;
        }
    });

})(window);
