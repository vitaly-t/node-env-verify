type FlagName = 'isDev' | 'isUAT' | 'isSIT' | 'isCI' | 'isTest' | 'isProd';

const flags: { [key in FlagName]: boolean } = {
    /**
     * Development Environment.
     */
    isDev: false,

    /**
     * User Acceptance Testing.
     */
    isUAT: false,

    /**
     * System Integration Testing.
     */
    isSIT: false,

    /**
     * Continuous Integration.
     */
    isCI: false,

    /**
     * General Testing Environment (includes UAT, SIT and CI)
     */
    isTest: false,

    /**
     * Production Environment.
     *
     * This is the default when environment is not set.
     */
    isProd: true
};

const searchMap: { [key in FlagName]: RegExp } = {
    isDev: /dev/i,
    isUAT: /uat/i,
    isSIT: /sit/i,
    isCI: /ci/i,
    isTest: /test|tst/i,
    isProd: /prod/i
};

function setActiveFlag(activeFlag: FlagName) {
    const keys = Object.keys(flags) as FlagName[];
    for (const k of keys) {
        flags[k] = k === activeFlag;
    }
    flags.isTest = flags.isTest || flags.isUAT || flags.isSIT || flags.isCI;
}

function refresh() {
    const s = process.env.NODE_ENV;

    if (!s) {
        setActiveFlag('isProd');
        return;
    }

    let found;
    const keys = Object.keys(flags) as FlagName[];
    for (const key of keys) {
        if (s.search(searchMap[key]) >= 0) {
            found = true;
            setActiveFlag(key);
            break;
        }
    }

    if (!found) {
        // the environment is set to something we cannot recognize;

        // we set all flags to false:
        for (const k of keys) {
            flags[k] = false;
        }
    }
}

refresh();

export const env = {
    ...flags,
    refresh
};
