import { PaperClipIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import useUser from '../../src/lib/hooks/useUser'

const ProfilePage: FC = () => {
  const { getUser } = useUser()
  const { email } = getUser()
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="w-1/2 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 leading-6">User</h3>
          <p className="max-w-2xl mt-1 text-sm text-gray-500">
            Personal details and status.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Application for
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Backend Developer
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                margotfoster@example.com
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                $120,000
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
            <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex items-center flex-1 w-0">
                      <PaperClipIcon
                        className="flex-shrink-0 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex-1 w-0 ml-2 truncate">
                        resume_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex items-center flex-1 w-0">
                      <PaperClipIcon
                        className="flex-shrink-0 w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="flex-1 w-0 ml-2 truncate">
                        coverletter_back_end_developer.pdf
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
