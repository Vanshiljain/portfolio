import { Component } from "react";

// Catches WebGL/Three.js failures (unsupported context, driver blocklists,
// lost context) so a broken GPU path degrades to the Canvas2D fallback
// instead of taking down the whole app.
export default class SceneErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("3D scene failed, falling back to 2D visual:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
