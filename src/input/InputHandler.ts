export class InputHandler implements ObserverPattern.ISubject {
    private observers: ObserverPattern.IObserver[] = [];
    public scene: Phaser.Scene;
    public pointer: Phaser.Input.Pointer;
    // public jumpKey: Phaser.Input.Keyboard.Key;
    public moveKeys: {up: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key};
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.pointer = scene.input.activePointer;
        // this.jumpKey = scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.moveKeys = {
            up: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.setupInputs();
    }

    public attach(observer: ObserverPattern.IObserver): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            return console.log('Observer has already been attached.');
        }

        this.observers.push(observer);
    }

    public detach(observer: ObserverPattern.IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('Nonexistent observer.');
        }

        this.observers.splice(observerIndex, 1);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.onNotify(this);
        }
    }

    private setupInputs(): void {
        // Setup pointer inputs
        this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
            // console.log(`Pointer down at x: ${pointer.x}, y: ${pointer.y}`);
            this.pointer = pointer;
            this.notify(); // Notify observers about the pointer event
        });
        this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: Phaser.Input.Pointer) => {
            //console.log(`Pointer up at x: ${pointer.x}, y: ${pointer.y}`);
            this.notify(); // Notify observers about the pointer event
        });
        this.scene.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
            //console.log(`Pointer move at x: ${pointer.x}, y: ${pointer.y}`);
            this.notify(); // Notify observers about the pointer event
        });
        // Remember to call this.notify() when an event you want to observe happens
        this.moveKeys.up.on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.notify();
        });
        this.moveKeys.down.on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.notify();
        });
        this.moveKeys.left.on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.notify();
        });
        this.moveKeys.right.on(Phaser.Input.Keyboard.Events.DOWN, () => {
            this.notify();
        });
        this.moveKeys.up.on(Phaser.Input.Keyboard.Events.UP, () => {
            this.notify();
        }
        );
        this.moveKeys.down.on(Phaser.Input.Keyboard.Events.UP, () => {
            this.notify();
        });
        this.moveKeys.left.on(Phaser.Input.Keyboard.Events.UP, () => {
            this.notify();
        });
        this.moveKeys.right.on(Phaser.Input.Keyboard.Events.UP, () => {
            this.notify();
        });
    }

    // Additional methods related to input handling
}