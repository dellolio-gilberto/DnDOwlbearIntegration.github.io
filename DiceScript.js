
    let canvas;
    
    // ThreeDDice class
    let dddice;

    // Initialize after window loads
    window.addEventListener('load', function() {
        canvas = document.getElementById('dddice');
        // Set canvas size to match window size
        resizeCanvas();
        // Add resize listener
        window.addEventListener('resize', resizeCanvas);
    });

    // Function to resize canvas
    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    // Initialize the SDK
    async function init() {
        try {
            const input = prompt('Enter API Key');
            if (input) {
                // Create new ThreeDDice instance
                dddice = new window.ThreeDDice(canvas, input);
                // Start the engine
                await dddice.start();
                alert('dddice initialized successfully!');
            }
        } catch (error) {
            console.error('Error initializing dddice:', error);
            alert('Error initializing dddice: ' + error.message);
        }
    }

    // Join a room
    async function join() {
        if (!dddice) {
            alert('dddice is not initialized');
            return;
        }

        try {
            const input = prompt('Enter Room Slug');
            if (input) {
                await dddice.connect(input);
                alert('Successfully joined room: ' + input);
            }
        } catch (error) {
            console.error('Error joining room:', error);
            alert('Error joining room: ' + error.message);
        }
    }

    // Roll dice
    async function roll() {
        if (!dddice) {
            alert('dddice is not initialized');
            return;
        }

        try {
            await dddice.roll([
                { type: 'd20', theme: 'dddice-standard' }
            ]);
        } catch (error) {
            console.error('Error rolling dice:', error);
            alert('Error rolling dice: ' + error.message);
        }
    }

    // Debug function
    function checkDddice() {
        console.log('Canvas:', canvas);
        console.log('dddice instance:', dddice);
        console.log('window.ThreeDDice:', window.ThreeDDice);
    }

