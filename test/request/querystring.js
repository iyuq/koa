
'use strict';

const context = require('../helpers/context');
const parseurl = require('parseurl');

describe('ctx.querystring', () => {
  it('should return the querystring', () => {
    const ctx = context({ url: '/store/shoes?page=2&color=blue' });
    ctx.querystring.should.equal('page=2&color=blue');
  });

  describe('when ctx.req not present', () => {
    it('should return an empty string', () => {
      const ctx = context();
      ctx.request.req = null;
      ctx.querystring.should.equal('');
    });
  });
});

describe('ctx.querystring=', () => {
  it('should replace the querystring', () => {
    const ctx = context({ url: '/store/shoes' });
    ctx.querystring = 'page=2&color=blue';
    ctx.url.should.equal('/store/shoes?page=2&color=blue');
    ctx.querystring.should.equal('page=2&color=blue');
  });

  it('should update ctx.search and ctx.query', () => {
    const ctx = context({ url: '/store/shoes' });
    ctx.querystring = 'page=2&color=blue';
    ctx.url.should.equal('/store/shoes?page=2&color=blue');
    ctx.search.should.equal('?page=2&color=blue');
    Object.keys(ctx.query).should.eql(['page', 'color']);
    ctx.query.page.should.equal('2');
    ctx.query.color.should.equal('blue');
  });

  it('should change .url but not .originalUrl', () => {
    const ctx = context({ url: '/store/shoes' });
    ctx.querystring = 'page=2&color=blue';
    ctx.url.should.equal('/store/shoes?page=2&color=blue');
    ctx.originalUrl.should.equal('/store/shoes');
    ctx.request.originalUrl.should.equal('/store/shoes');
  });

  it('should not affect parseurl', () => {
    const ctx = context({ url: '/login?foo=bar' });
    ctx.querystring = 'foo=bar';
    const url = parseurl(ctx.req);
    url.path.should.equal('/login?foo=bar');
  });
});
