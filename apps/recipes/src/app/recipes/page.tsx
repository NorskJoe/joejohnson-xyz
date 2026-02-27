import { fetchRecipes } from '@actions/get';
import ClientButton from '@components/client-button/client-button';
import { titleSlugify } from '@libs/utils';
import Link from 'next/link';
import React from 'react';

import styles from './recipes.module.scss';
import { Pencil, Trash2 } from 'lucide-react';

const RecipesLandingPage = async () => {
  const data = await fetchRecipes();
  return (
    <div className={styles['container']}>
      <h1>Recipes</h1>
      {/* TODO: add pagination and search functionality here */}
      <ul className={styles['recipe-list']}>
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Link
              href={`/recipes/${titleSlugify(recipe.title)}`}
              className={styles['recipe-title']}
            >
              {recipe.title}
            </Link>
            <div className={styles['actions']}>
              <Link
                href={`/admin/edit/${titleSlugify(recipe.title)}`}
                className={styles['action-link']}
              >
                <Pencil className={styles['icon']} size={'28px'} />{' '}
                <span>Edit</span>
              </Link>
              <ClientButton
                className={`${styles['delete-button']} ${styles['action-link']}`}
                mode="delete"
                recordId={recipe.slug}
                rerender={true}
              >
                <Trash2 className={styles['icon']} size={'28px'} />{' '}
                <span>Delete</span>
              </ClientButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesLandingPage;
