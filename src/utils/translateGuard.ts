// Google Translate wraps text nodes in <font> tags, which breaks React's
// assumptions about the DOM it owns — removeChild/insertBefore then throw
// NotFoundError and crash the app on re-render. This standard guard makes
// those operations tolerate nodes Google Translate has moved.
export function installTranslateGuard() {
  if (typeof Node !== 'function' || !Node.prototype) return;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, reference: Node | null): T {
    if (reference && reference.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null) as T;
    }
    return originalInsertBefore.call(this, newNode, reference) as T;
  };
}
