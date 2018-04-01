// https://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/

export default fn => {
  return async done => {
    try {
      await fn();
      done();
    } catch (err) {
      done(err);
    }
  };
};
