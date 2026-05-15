# ProjectName SDK exists test

import pytest
from publibikestations_sdk import PublibikeStationsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PublibikeStationsSDK.test(None, None)
        assert testsdk is not None
