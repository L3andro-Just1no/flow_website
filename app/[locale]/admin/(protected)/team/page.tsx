import { createClient } from '@/lib/supabase/server';

export default async function AdminTeamPage() {
  const supabase = await createClient();

  let teamMembers = null;

  if (supabase) {
    try {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('order', { ascending: true });
      teamMembers = data;
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Equipa</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Adicionar Membro
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((member) => {
                const role = member.role_title?.pt || member.role_title?.en || '-';
                return (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {member.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-black hover:text-gray-600 mr-4">
                        Editar
                      </a>
                      <a href="#" className="text-red-600 hover:text-red-900">
                        Eliminar
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum membro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
