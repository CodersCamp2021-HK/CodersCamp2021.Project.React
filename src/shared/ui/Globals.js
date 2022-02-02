import process from 'process';

const githubPrefix = process.env.NODE_ENV === 'production' ? 'CodersCamp2021.Project.React/' : '/';

export { githubPrefix };
