// // src/blockScripts.ts
// export function blockAllScripts() {
//   // 1. Remove existing <script>
//   document.querySelectorAll("script").forEach(script => {
//     script.remove();
//     console.log("🚫 Removed script:", script.src || "[inline]");
//   });

//   // 2. Block future scripts
//   const observer = new MutationObserver(mutations => {
//     for (const mutation of mutations) {
//       for (const node of mutation.addedNodes) {
//         if (node.tagName === "SCRIPT") {
//           node.remove();
//           console.log("🚫 Blocked future script:", node.src || "[inline]");
//         }
//       }
//     }
//   });
//   observer.observe(document.documentElement, { childList: true, subtree: true });

//   // 3. Disable eval / new Function
//   window.eval = () => { throw new Error("🚫 eval blocked"); };
//   window.Function = () => { throw new Error("🚫 Function blocked"); };
// }
