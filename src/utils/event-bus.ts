/**
 * Event Bus - 用于模块间通信的事件总线
 * 提供发布-订阅模式，解耦模块间依赖
 */

type EventHandler<T = unknown> = (data: T) => void;

class EventBus {
  private events: Record<string, EventHandler<unknown>[]> = {};

  /**
   * 订阅事件
   * @param event 事件名称
   * @param handler 事件处理函数
   * @returns 取消订阅的函数
   */
  subscribe<T>(event: string, handler: EventHandler<T>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler as EventHandler<unknown>);
    
    // 返回取消订阅函数
    return () => this.unsubscribe(event, handler);
  }

  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param handler 事件处理函数
   */
  unsubscribe<T>(event: string, handler: EventHandler<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(h => h !== (handler as EventHandler<unknown>));
  }

  /**
   * 发布事件
   * @param event 事件名称
   * @param data 事件数据
   */
  publish<T>(event: string, data: T) {
    if (!this.events[event]) return;
    this.events[event].forEach(handler => handler(data));
  }

  /**
   * 清除特定事件的所有订阅
   * @param event 事件名称
   */
  clear(event: string) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }

  /**
   * 清除所有事件订阅
   */
  clearAll() {
    this.events = {};
  }
}

// 导出单例
export const eventBus = new EventBus();

export default eventBus;
