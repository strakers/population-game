
export default abstract class EventHandler {
  /**
   * Defines the type of event that triggers the handler (e.g., 'click', 'mouseover').
   * This property should be overridden in subclasses to specify the appropriate event type for each handler.
   * @type {string}
   * @throws Error if the property is not defined in the subclass.
   */
  static eventName: string;

  /**
   * Defines the behavior that occurs when the specified event is triggered on the associated display element.
   * This method should be overridden in subclasses to implement specific behaviors for different types of handlers.
   * @param event The event object from the triggered event.
   * @throws Error if the method is not implemented in the subclass.
   * @returns void
   */
  static effect(event: Event): void {
    console.warn('Unhandled event triggered for', this, event);
    throw new Error("Effect method not implemented for this handler.");
  };

  /**
   * Applies the handler to a displayable entity's display element, binding the effect method to the entity's context.
   * @param entity
   * @param eventNameOverride
   * @returns
   */
  static applyTo(entity: DisplayableEntity, eventNameOverride: string|null = null): void {
    const element = entity.getDisplayElement();
    if (!element) {
      console.warn(`Entity does not have a display element registered.`);
      return;
    }
    element.addEventListener(eventNameOverride || this.eventName, this.effect.bind(entity));
  }

  /**
   * Applies the listener to a specific HTML element, binding the effect method to the given context.
   * @param element
   * @param eventNameOverride
   * @param context
   */
  static applyToElement(element: HTMLElement, eventNameOverride: string|null = null, context: DisplayableEntity): void {
    element.addEventListener(eventNameOverride || this.eventName, this.effect.bind(context));
  }
}

/**
 * Interface for entities that can be displayed in the UI, requiring a method to retrieve their display element.
 */
export interface DisplayableEntity {
  getDisplayElement(): HTMLElement | null;
}