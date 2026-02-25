
export default abstract class ActionListener {
  /**
   * Defines the type of action that triggers the listener (e.g., 'click', 'mouseover').
   * This property should be overridden in subclasses to specify the appropriate action type for each listener.
   * @type {string}
   * @throws Error if the property is not defined in the subclass.
   */
  static onAction: string;

  /**
   * Defines the behavior that occurs when the specified action is triggered on the associated display element.
   * This method should be overridden in subclasses to implement specific behaviors for different types of listeners.
   * @param event The event object from the triggered event.
   * @throws Error if the method is not implemented in the subclass.
   * @returns void
   */
  static effect(event: Event): void {
    console.warn('Unhandled event triggered for', this, event);
    throw new Error("Effect method not implemented for this listener.");
  };

  /**
   * Applies the listener to a displayable entity's display element, binding the effect method to the entity's context.
   * @param entity
   * @param onActionOverride
   * @returns
   */
  static apply(entity: DisplayableEntity, onActionOverride: string|null = null): void {
    const element = entity.getDisplayElement();
    if (!element) {
      console.warn(`Entity does not have a display element registered.`);
      return;
    }
    element.addEventListener(onActionOverride || this.onAction, this.effect.bind(entity));
  }

  /**
   * Applies the listener to a specific HTML element, binding the effect method to the given context.
   * @param element
   * @param onActionOverride
   * @param context
   */
  static applyToElement(element: HTMLElement, onActionOverride: string|null = null, context: DisplayableEntity): void {
    element.addEventListener(onActionOverride || this.onAction, this.effect.bind(context));
  }
}

/**
 * Interface for entities that can be displayed in the UI, requiring a method to retrieve their display element.
 */
export interface DisplayableEntity {
  getDisplayElement(): HTMLElement | null;
}