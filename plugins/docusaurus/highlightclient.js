import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export function onRouteDidUpdate({location, previousLocation}) {
    if (ExecutionEnvironment.canUseDOM) {
        if (location.hash?.startsWith('#')) {
            const refElement = document.getElementById(location.hash.replace('#', ''));
            if (refElement) {
                if (refElement.parentElement.tagName !== 'MARK') {
                    refElement.parentElement.innerHTML = "<mark>" + refElement.parentElement.innerHTML + "</mark>";
                }
            }
        }
    }
}