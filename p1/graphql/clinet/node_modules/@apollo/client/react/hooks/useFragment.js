import { __assign, __rest } from "tslib";
import * as React from "react";
import { equal } from "@wry/equality";
import { mergeDeepArray } from "../../utilities/index.js";
import { useApolloClient } from "./useApolloClient.js";
import { useSyncExternalStore } from "./useSyncExternalStore.js";
export function useFragment(options) {
    var cache = useApolloClient().cache;
    var fragment = options.fragment, fragmentName = options.fragmentName, from = options.from, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, rest = __rest(options, ["fragment", "fragmentName", "from", "optimistic"]);
    var diffOptions = __assign(__assign({}, rest), { returnPartialData: true, id: typeof from === "string" ? from : cache.identify(from), query: cache["getFragmentDoc"](fragment, fragmentName), optimistic: optimistic });
    var resultRef = React.useRef();
    var latestDiff = cache.diff(diffOptions);
    // Used for both getSnapshot and getServerSnapshot
    var getSnapshot = function () {
        var latestDiffToResult = diffToResult(latestDiff);
        return (resultRef.current &&
            equal(resultRef.current.data, latestDiffToResult.data)) ?
            resultRef.current
            : (resultRef.current = latestDiffToResult);
    };
    return useSyncExternalStore(function (forceUpdate) {
        var lastTimeout = 0;
        var unsubcribe = cache.watch(__assign(__assign({}, diffOptions), { immediate: true, callback: function (diff) {
                if (!equal(diff, latestDiff)) {
                    resultRef.current = diffToResult((latestDiff = diff));
                    lastTimeout = setTimeout(forceUpdate);
                }
            } }));
        return function () {
            unsubcribe();
            clearTimeout(lastTimeout);
        };
    }, getSnapshot, getSnapshot);
}
function diffToResult(diff) {
    var result = {
        data: diff.result,
        complete: !!diff.complete,
    };
    if (diff.missing) {
        result.missing = mergeDeepArray(diff.missing.map(function (error) { return error.missing; }));
    }
    return result;
}
//# sourceMappingURL=useFragment.js.map