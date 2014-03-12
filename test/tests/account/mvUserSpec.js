describe('mvUser', function () {
	beforeEach(module('app'))

	describe('isAdmin', function () {
		it('should return false if the roles array does not have an admin entry', inject(function(mvUser){
			var user = new mvUser();
			user.roles = ['not admin'];
			console.log('user', user);
			console.log('user.isAdmin()', user.isAdmin());			
			expect(user.isAdmin()).to.be.false;
		}));
		it('should return true if the roles array has an admin entry', inject(function(mvUser){
			var user = new mvUser();
			user.roles = ['admin'];
			console.log('user', user);
			console.log('user.isAdmin()', user.isAdmin());
			expect(user.isAdmin()).to.be.true;
		}));
	})
})