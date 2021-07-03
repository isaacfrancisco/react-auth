import Realm from 'realm';

export default function getRealm() {
  return Realm.open({
    schema: [RepositorySchema],
  });
}

class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      name: 'string',
      fullName: 'string',
      description: 'string',
      stars: 'int',
      forks: 'int',
    },
  };
}
