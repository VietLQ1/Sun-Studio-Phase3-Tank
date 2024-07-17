declare namespace ObserverPattern {
    interface IObserver {
        onNotify(ISubject): void;
    }
    interface ISubject {
        attach(observer: IObserver): void;
        detach(observer: IObserver): void;
        notify(): void;
    }
}
declare namespace TankGame {
    interface IBulletConstructor {
        scene: Phaser.Scene;
        rotation: number;
        x: number;
        y: number;
        texture: string;
        frame?: string | number;
    }
    interface IImageConstructor {
        scene: Phaser.Scene;
        x: number;
        y: number;
        texture: string;
        frame?: string | number;
    }
}