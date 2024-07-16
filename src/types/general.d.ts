declare namespace ObserverPattern
{
    interface IObserver
    {
        onNotify(ISubject): void;
    }
    interface ISubject
    {
        attach(observer: IObserver): void;
        detach(observer: IObserver): void;
        notify(): void;
    }
}